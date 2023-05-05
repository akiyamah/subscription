import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link';


const Index = () => {
  return ( 
    <>
      <Head>
        <title>FINE | ユーザー検索</title>
      </Head>
      <div>
      イベユーザー検索
      </div>      
      <div>ユーザー検索</div>
    </>
  )
}

export default Index 