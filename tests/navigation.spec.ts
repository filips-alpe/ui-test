import { test, expect, Page } from "@playwright/test";
import { createModel } from "@xstate/test";
import { createMachine, EventObject } from "xstate";

interface TestContext {
  page: Page;
}

const machineDefinition = {
  id: "navigation",
  initial: "list",
  context: {},
  states: {
    list: {
      on: {
        OPEN_DETAILS: "detail",
      },
    },
    detail: {},
  },
  schema: {
    context: {} as {},
    events: {} as { type: "OPEN_DETAILS"; id: string },
  },
  predictableActionArguments: true,
};

async function listPageTest({ page }: TestContext) {
  await expect(await page.getByText("list page")).toBeVisible();
}
(machineDefinition.states.list as any).meta = { test: listPageTest };

async function detailPageTest({ page }: TestContext) {
  expect(page.url()).toMatch(/\/device\//);
  await expect(await page.getByText("device page")).toBeVisible();
}
(machineDefinition.states.detail as any).meta = { test: detailPageTest };

const machine = createMachine(machineDefinition);

const model = createModel<TestContext>(machine).withEvents({
  OPEN_DETAILS: {
    exec: async ({ page }, e: EventObject & { id: string }) =>
      page.goto(`/device/${e.id}`),
    cases: [{ id: "foo" }, { id: "bar" }],
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
