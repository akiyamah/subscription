import cookie from  'cookie'

export default async (req, res) => {
    console.log('userアクションが呼び出されました', req.body)
    if (req.method === "GET") {
        console.log("Get method ")
      const cookies = cookie.parse(req.headers.cookie ?? '')
      const access =  cookies.access ?? false

      if (access === false) {
        console.log(" アクセストークンがありません ")
        return res.status(401).json({error: "アクセストークンがありません",});
      }  
      try {
        console.log('try 処理開始', )
        const apiRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/`, {
                method: "GET",
                headers: {Authorization: `Bearer ${access}`,
            },
        })
        const data = await apiRes.json();

        if (apiRes.status === 200) {
            console.log(`ユーザー情報取得に成功: ${data.user.name}`)

            return res.status(200).json({user: data.user, })
        }  
        else {
          return res.status(apiRes.status).json({error: "ユーザー情報取得に失敗しました",});
        }
      } 
      catch (err) {
        console.log('catch 通過')
        return res.status(500).json({error: "ユーザー情報取得に失敗しました",});
      }
    } else {
      res.setHeader("Allow", ["GET "]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  };
