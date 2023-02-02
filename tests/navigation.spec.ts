import { test, expect, Page } from "@playwright/test";
import { createModel } from "@xstate/test";
import { assign, createMachine, EventObject } from "xstate";

interface TestContext {
  page: Page;
}

const machineDefinition = {
  id: "navigation",
  initial: "list",
  context: {
    searchValue: "",
    productLines: [],
  },
  states: {
    list: {
      on: {
        OPEN_DETAILS: "detail",
        SEARCH: {
          actions: "setSearchValue",
        },
        FILTER: {
          actions: "setFilter",
        },
      },
    },
    detail: {
      entry: ["clearSearchValue", "clearFilter"],
    },
  },
  schema: {
    context: {} as {
      searchValue: string;
      productLines: string[];
    },
    events: {} as
      | { type: "OPEN_DETAILS"; id: string }
      | { type: "SEARCH"; value: string }
      | { type: "FILTER"; productLines: string[] },
  },
  predictableActionArguments: true,
};

async function listPageTest({ page }: TestContext) {
  expect(await page.title()).toEqual("Device list");
  await testPageHeader({ page });
  await expect(await page.locator("table")).toBeVisible();
  await expect(await page.locator("tr img").first()).toBeVisible();

  const numOfResults = parseInt(
    (
      (await page.getByTestId("num-of-results").first().textContent()) || ""
    ).replace(/\D/g, ""),
    10,
  );
  await expect(await page.locator("tbody tr").count()).toBe(
    Math.min(numOfResults, 15),
  );
}
(machineDefinition.states.list as any).meta = { test: listPageTest };

async function detailPageTest({ page }: TestContext) {
  expect(page.url()).toMatch(/\/device\//);
  expect(await page.title()).toEqual("Device details");
  await testPageHeader({ page });
}
(machineDefinition.states.detail as any).meta = { test: detailPageTest };

async function testPageHeader({ page }: TestContext) {
  await expect(await page.locator("header")).toContainText("Devices");
  await expect(await page.locator("header")).toContainText(
    "Author/Filips Alpe",
  );
  await expect(await page.locator("header svg")).toBeVisible();
}

const machine = createMachine(machineDefinition, {
  actions: {
    setSearchValue: assign((ctx, event) => ({
      searchValue: (event as { value: string }).value,
    })),
    clearSearchValue: assign({
      searchValue: "",
    }),
    setFilter: assign((ctx, event) => ({
      productLines: (event as { productLines: string[] }).productLines,
    })),
    clearFilter: assign({
      productLines: [] as string[],
    }),
  },
});

const model = createModel<TestContext>(machine).withEvents({
  OPEN_DETAILS: {
    exec: async ({ page }, e: EventObject & { id: string }) =>
      page.goto(`/device/${e.id}`),
    cases: [{ id: "foo" }, { id: "bar" }],
  },
  SEARCH: {
    exec: async (
      { page },
      e: EventObject & { value: string; matchingDevices: number },
    ) => {
      await page.locator("input[type=search]").fill(e.value);
      await expect(
        await page.getByText(`${e.matchingDevices} devices`),
      ).toBeVisible();
    },
    cases: [
      { value: "conf", matchingDevices: 1 },
      { value: "g4", matchingDevices: 7 },
      { value: "0", matchingDevices: 62 },
      { value: "", matchingDevices: 432 },
    ],
  },
  FILTER: {
    exec: async (
      { page },
      e: EventObject & { productLines: string[]; matchingDevices: number },
    ) => {
      await page.locator("input[type=search]").clear();
      for (const p of e.productLines) {
        await page.locator(`input[type=checkbox][value="${p}"]`).check();
      }
      await expect(
        await page.getByText(`${e.matchingDevices} devices`),
      ).toBeVisible();
    },
    cases: [
      { productLines: ["UniFi"], matchingDevices: 116 },
      { productLines: ["airMAX", "UniFi Protect"], matchingDevices: 157 },
      { productLines: [], matchingDevices: 432 },
    ],
  },
});

test.describe.serial("navigation", () => {
  const pathPlans = model.getShortestPathPlans();

  pathPlans.forEach((plan) => {
    test(plan.description, async ({ page }) => {
      await page.goto("/");
      await plan.test({ page });
    });
  });

  test("coverage", () => {
    model.testCoverage();
  });
});
