// 'use client'
// import { useSearchParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

async function getiData(id) {
  // const pokeId = useSearchParams()
  // const id = pokeId.get('id')
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  // console.log(id);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Page({params}) {
  const poke = await getiData(params.id);
  let pokeIndex = ("00" + (params.id)).slice(-3);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-rose-400 px-6 py-3"><div className="text-xl text-white font-extrabold font-sans">Pokemon</div></div>   
      <div className=' flex py-3 text-center capitalize text-3xl font-bold'><div className='rounded-lg mx-auto px-20 py-2 bg-white'><span className='text-violet-500'>{poke.name}</span></div></div>  
      <div className=''>
        <Image
          className='m-auto'
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`}
          width={300}
          height={300}
          alt='pokeImage'
        />
        <div className='flex justify-center'>
        <div className='pt-3'>
          <li className='text-base pr-20 py-2 border-b-2 border-emerald-400 font-bold'>Height: {poke.height}</li>
          <li className='text-base pr-20 py-2 border-b-2 border-violet-400 font-bold'>Base_experience: {poke.base_experience}</li>
          <li className='text-base pr-20 py-2 border-b-2 border-orange-300 font-bold'>Order: {poke.order}</li>
          <li className='text-base pr-20 py-2 border-b-2 border-rose-400 font-bold'>Weight: {poke.weight}</li>
        </div>
        </div>
        <div className="text-center">
        <button className='font-bold hover:text-emerald-500 text-emerald-400 bg-white py-2 px-4 m-3 shadow-md rounded-md'>
          <Link href="/">Home</Link>
        </button>
        </div>
      </div>
    </div>
  )
}
