/**
 * @jest-environment jsdom
 */

import { render, waitFor, within } from "@testing-library/react";
import React from "react";
import { Meta } from "./Meta";

describe("Meta test", () => {
  it("renders an empty string if no title is given", async () => {
    render(<Meta title="" baseUrl="" siteTitle="WmkAgency" slug="" />);
    await waitFor(() => expect(document.title).toEqual(""));
  });

  it("renders only the site title if a space is given", async () => {
    render(<Meta title=" " baseUrl="" siteTitle="WmkAgency" slug="" />);
    await waitFor(() => expect(document.title).toEqual("WmkAgency"));
  });

  it("renders only a title if siteTitle is not given", async () => {
    render(<Meta title="Home" baseUrl="" siteTitle="" slug="" />);
    await waitFor(() => expect(document.title).toEqual("Home"));
  });

  it("renders the title of the site in the format title | siteTitle", async () => {
    render(<Meta title="Index" baseUrl="" siteTitle="Watermark" slug="" />);
    await waitFor(() => expect(document.title).toEqual("Index | Watermark"));
  });

  it("displays the base url", async () => {
    render(
      <Meta
        title="Home"
        baseUrl="https://wmkagency.com"
        siteTitle="Wmk Agency"
        slug=""
      />
    );
    await waitFor(() => {
      const href = within(document.head)
        .getByTitle("link")
        .getAttribute("href");
      expect(href).toBe("https://wmkagency.com");
    });
  });

  it("displays the base url connected to the slug", async () => {
    render(
      <Meta
        title="Home"
        baseUrl="https://wmkagency.com"
        siteTitle="Wmk Agency"
        slug="about"
      />
    );
    await waitFor(() => {
      const href = within(document.head)
        .getByTitle("link")
        .getAttribute("href");
      expect(href).toBe("https://wmkagency.com/about");
    });
  });

  it("displays the correct url from baseurl slug and path", async () => {
    render(
      <Meta
        title="Home"
        baseUrl="https://wmkagency.com"
        siteTitle="Wmk Agency"
        slug="blog-name"
        path="/blogs/"
      />
    );
    await waitFor(() => {
      const href = within(document.head)
        .getByTitle("link")
        .getAttribute("href");
      expect(href).toBe("https://wmkagency.com/blogs/blog-name");
    });
  });
});
