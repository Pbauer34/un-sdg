import { html, fixture, expect } from '@open-wc/testing';
import "../un-sdg.js";

describe("unSdg test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <un-sdg
        title="title"
      ></un-sdg>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
