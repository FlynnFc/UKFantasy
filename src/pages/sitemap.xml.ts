
function SiteMap(props:any) {
  console.log(props)
  return `<xml version="1.0" encoding="UTF-8">
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
  <loc>https://esportsfantasy.app/</loc>
</url>
 <url>
  <loc>https://esportsfantasy.app/leagues</loc>
</url>     
 <url>
  <loc>https://esportsfantasy.app/privacy</loc>
</url>
 <url>
  <loc>https://esportsfantasy.app/help</loc>
</url>
 <url>
  <loc>https://esportsfantasy.app/report</loc>
</url>
    ${props.data
      .map(({name}:{name:string}) => {
        return `
      <url>
          <loc>${`esportsfantasy.app/${name}`}</loc>
      </url>
    `;
      })
      .join('')}
  </urlset>
`;
}

export async function getServerSideProps() {
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/allLeagues`, { method: "GET" });
  const data = await res.json();

  return {
    props:{data}
  };
}

export default SiteMap;