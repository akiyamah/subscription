import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link';


const Index = () => {
  return ( 
    <>
      <Head>
        <title>FINE | ポリシー</title>
      </Head>
      <div>
        ポリシー表示画面
      </div>      
      <div>ポリシー</div>
    </>
  )
}

export default Index 