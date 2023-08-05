import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home() {
  const {results} = await getData();
  let pokemon = results.map((value, index)=>{
    let pokeIndex = ("00" + (index + 1)).slice(-3);
    let imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`;
    return ({
      ...value,
      imageUrl
    })
  })

  return (
    <div className="bg-gray-100">
      <div className="bg-rose-400 px-6 py-3"><div className="text-xl text-white font-extrabold font-sans">Pokemon</div></div>
      <div className="text-6xl text-center mt-6 text-blue-400 font-medium">Know About Pokemons</div>
      <div className="grid grid-cols-3 gap-1 px-20 py-7">

        {pokemon.map((value, index)=>{
          return <div key={value.name} className="flex items-center shadow-md shadow-gray-200 first-letter:text-center bg-white m-2 p-10 rounded-lg font-sans font-medium text-gray-700 text-lg ">
            <Link href={`/pokemon/${index+1}`}>
            <Image
              src={value.imageUrl}
              width={100}
              height={400}
              alt = "image"
            />
            </Link>
            <Link href={`/pokemon/${index+1}`}><div className="pl-5 capitalize">{index+1}. {value.name}</div></Link>
            </div>
        })}
      </div>
    </div>
  )
}
