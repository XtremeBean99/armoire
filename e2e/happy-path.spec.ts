import { test, expect } from "@playwright/test";

async function addItem(page: any, swatchName: string, garmentLabel: string) {
  await page.goto("/add");

  // Click a colour swatch by its aria-label
  await page.getByRole("button", { name: swatchName, exact: true }).first().click();

  // Select the correct slot tab
  const slotMap: Record<string, string> = {
    "T-shirt": "Tops",
    "Jeans": "Bottoms",
    "Sneakers": "Footwear",
  };
  const slotTab = slotMap[garmentLabel] ?? "Tops";
  await page.getByRole("button", { name: slotTab }).click();

  // Select the garment type chip
  await page.getByRole("button", { name: garmentLabel, exact: true }).click();

  // Save
  await page.getByRole("button", { name: /save item/i }).click();
  await expect(page).toHaveURL(/wardrobe/);
}

test("add, generate, wear, regenerate", async ({ page }) => {
  await addItem(page, "Navy", "T-shirt");
  await addItem(page, "Grey", "Jeans");
  await addItem(page, "Black", "Sneakers");

  await page.goto("/");
  await page.getByRole("button", { name: /generate outfits/i }).click();
  const firstCard = page.locator("text=Mark worn").first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();

  await page.getByRole("button", { name: /generate outfits/i }).click();
  // With only one of each slot, benched items leave no valid outfit on the next gen.
  await expect(page.getByText(/no outfits to show/i)).toBeVisible();
});
