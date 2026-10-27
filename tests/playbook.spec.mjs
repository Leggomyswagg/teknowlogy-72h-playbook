import { test, expect } from '@playwright/test';
for (const width of [1440, 390, 320]) test(`built playbook saves independent days and fits ${width}px`, async ({ page }) => {
 await page.setViewportSize({width,height:960});
 const errors=[], external=[];
 page.on('pageerror', error=>errors.push(error.message));
 await page.route('**/*', route=>{
  if (new URL(route.request().url()).hostname==='127.0.0.1') return route.continue();
  external.push(route.request().url());return route.abort();
 });
 await page.goto('/');
 await page.getByRole('button',{name:'Day 1',exact:true}).click();
 await page.getByRole('checkbox',{name:'Deploy portal',exact:true}).check();
 await page.getByRole('button',{name:'Day 2',exact:true}).click();
 await page.getByRole('checkbox',{name:'Introduce your offer locally',exact:true}).check();
 await page.reload();
 await expect(page.getByRole('checkbox',{name:'Introduce your offer locally',exact:true})).toBeChecked();
 await page.getByRole('button',{name:'Day 1',exact:true}).click();
 await expect(page.getByRole('checkbox',{name:'Deploy portal',exact:true})).toBeChecked();
 await page.getByRole('link',{name:'Start the plan'}).click();
 await expect(page).toHaveURL(/#execution-plan$/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(errors).toEqual([]);expect(external).toEqual([]);
});
test('invalid storage recovers and denied clipboard gives a usable manual fallback',async({page})=>{
 await page.addInitScript(()=>{
  localStorage.setItem('teknowlogy-72h-progress-v1','not-json');
  Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{throw new DOMException('Denied','NotAllowedError');}}});
 });
 await page.goto('/');
 await expect(page.getByRole('checkbox').first()).not.toBeChecked();
 await page.getByRole('button',{name:'Copy',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('copy it manually');
 await expect(page.locator('pre')).toContainText('[Your name]');
});
test('blocked storage never prevents editing progress',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('Blocked');}}));
 await page.goto('/');
 await page.getByRole('checkbox').first().check();
 await expect(page.getByRole('checkbox').first()).toBeChecked();
 await expect(page.getByRole('status')).toContainText('cannot save progress');
 expect(errors).toEqual([]);
});
