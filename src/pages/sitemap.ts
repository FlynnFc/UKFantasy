import MetadataRoute from 'next';
 
export default function sitemap(props:any): MetadataRoute.Sitemap {
console.log(props)
  const staticPages = [
    {
      url: 'https://esportsfantasy.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://esportsfantasy.app/leagues',
      lastModified: new Date(),
    },
    {
      url: 'https://esportsfantasy.app/privacy',
      lastModified: new Date(),
    },
    {
      url: 'https://esportsfantasy.app/help',
      lastModified: new Date(),
    },    {
      url: 'https://esportsfantasy.app/report',
      lastModified: new Date(),
    }

  ]

  const dynamic = props.data.map(({name}:{name:string}) => {
    {url:`https://esportsfantasy.app/${name.toLocaleLowerCase()}`; lastModified: new Date();}
  })
  console.log(dynamic)


  return staticPages;
}

export async function getServerSideProps() {
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/allLeagues`, { method: "GET" });
  const data = await res.json();

  return {
    props:{data}
  };
}
