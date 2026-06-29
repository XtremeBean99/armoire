import { test, expect } from "@playwright/test";
import path from "node:path";

const fx = (n: string) => path.join(__dirname, "fixtures", n);

async function addItem(page: any, file: string, type: string) {
  await page.goto("/add");
  await page.setInputFiles('input[type="file"]', fx(file));
  await page.getByText(/#([0-9a-f]{6})/i).waitFor({ timeout: 30_000 });
  await page.getByRole("button", { name: new RegExp(type, "i") }).click();
  await page.getByRole("button", { name: /save item/i }).click();
  await expect(page).toHaveURL(/wardrobe/);
}

test("add, generate, wear, regenerate", async ({ page }) => {
  await addItem(page, "navy-tshirt.png", "T-shirt");
  await addItem(page, "grey-jeans.png", "Jeans");
  await addItem(page, "black-shoes.png", "Sneakers");

  await page.goto("/");
  await page.getByRole("button", { name: /generate outfits/i }).click();
  const firstCard = page.locator("text=Mark worn").first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();

  await page.getByRole("button", { name: /generate outfits/i }).click();
  // With only one of each slot, benched items leave no valid outfit on the next gen.
  await expect(page.getByText(/no outfits yet/i)).toBeVisible();
});
