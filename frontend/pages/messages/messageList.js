import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link';


const Index = () => {
  return ( 
    <>
      <Head>
        <title>FINE | ダイレクトメッセージ</title>
      </Head>
      <div>
      ダイレクトメッセージ
      </div>      
      <div>ダイレクトメッセージ</div>
    </>
  )
}

export default Index 