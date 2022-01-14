import * as React from "react";
import Helmet from "react-helmet";

export interface GraphMeta {
  [key: string]: string | { [key: string]: string };
}

export const generateGraph = (
  type: string,
  graphMeta: GraphMeta = {},
  baseUrl: string
) => {
  const info = {
    "@type": type,
    "@id": baseUrl + "/#" + type.toLowerCase()
  };
  return {
    ...info,
    ...graphMeta
  };
};

export interface SeoSchemaProps {
  graphs: GraphMeta[];
  baseUrl: string;
  siteTitle: string;
}

export const Schema = ({ graphs, baseUrl, siteTitle }: SeoSchemaProps) => {
  const website = generateGraph(
    "WebSite",
    {
      name: siteTitle,
      url: baseUrl,
      publisher: {
        "@id": baseUrl + "/#organization"
      }
    },
    baseUrl
  );

  graphs.push(website);
  const schema: { "@context": string; "@graph": GraphMeta[] } = {
    "@context": "https://schema.org",
    "@graph": []
  };
  graphs.forEach((graph) => schema["@graph"].push(graph));
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
