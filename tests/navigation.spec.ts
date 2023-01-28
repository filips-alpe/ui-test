import { test, expect, Page } from "@playwright/test";
import { createModel } from "@xstate/test";
import { createMachine } from "xstate";

interface TestContext {
  page: Page;
}

const machineDefinition = {
  id: "navigation",
  initial: "list",
  context: {},
  states: {
    list: {},
  },
  schema: {
    context: {} as {},
    events: {} as { type: "NOTHING" },
  },
  predictableActionArguments: true,
};

async function listPageTest({ page }: TestContext) {
  await expect(await page.getByText("list page")).toBeVisible();
}
(machineDefinition.states.list as any).meta = { test: listPageTest };

const machine = createMachine(machineDefinition);

const model = createModel<TestContext>(machine).withEvents({});

test.describe.serial("navigation", () => {
  const pathPlans = model.getShortestPathPlans();

  pathPlans.forEach((plan) => {
    test(plan.description, async ({ page }) => {
      await page.goto("/");
      await plan.test({ page });
    });
  });

  test("coverfge", () => {
    model.testCoverage();
  });
});
