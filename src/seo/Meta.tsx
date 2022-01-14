import * as React from "react";
import Helmet from "react-helmet";

const sanitizeSocialImageUrl = (url: string) => {
  return url.indexOf("//") === 0 ? "https:" + url : url;
};

export interface SeoMetaProps {
  description?: string;
  lang?: string; // page language
  title: string;
  path?: string; // path to page after url but before slug
  slug: string;
  ogImageUrl?: string; // for Facebook's Open Graph Protocol
  twitterImageUrl?: string; // for sharing on twitter
  twitterHandle?: string; // site twitter Id
  baseUrl: string; // main url for production site (w/ protocol, w/o slash)
  siteTitle: string; // main site or company name
  fullPath?: string; // full path to page
}

export const Meta = ({
  description = ``,
  lang = `en`,
  title,
  path = `/`,
  slug,
  ogImageUrl = ``,
  twitterImageUrl = ``,
  twitterHandle = ``,
  baseUrl = ``,
  siteTitle
}: SeoMetaProps) => {
  const slugVar = !slug || slug === "/" ? "" : slug;
  const pathVar = !slug || slug === "/" ? "" : path;
  const metaProps = [
    {
      name: `description`,
      content: description
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: description
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      property: `og:url`,
      content: `${baseUrl}${pathVar}${slugVar}`
    },
    {
      property: `og:sitename`,
      content: baseUrl
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: siteTitle
    },
    {
      name: `twitter:image:alt`,
      content: title
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: description
    }
  ];
  if (ogImageUrl !== ``) {
    metaProps.push({
      property: `og:image`,
      content: sanitizeSocialImageUrl(ogImageUrl)
    });
  } else {
    console.log("No Open Graph Image set in WmkSeo.Meta");
  }

  if (twitterImageUrl !== ``) {
    metaProps.push({
      name: `twitter:image`,
      content: sanitizeSocialImageUrl(twitterImageUrl)
    });
  } else {
    console.log("No Twitter Image set in WmkSeo.Meta");
  }

  if (twitterHandle !== ``) {
    metaProps.push({
      name: `twitter:site`,
      content: twitterHandle
    });
  } else {
    console.log("No Twitter Handle set in WmkSeo.Meta");
  }

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      link={[
        {
          rel: "canonical",
          href: `${baseUrl}${pathVar}${slugVar}`
        }
      ]}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={metaProps}
    />
  );
};
