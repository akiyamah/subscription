import cookie from  'cookie'

export default async (res, res) => {
    console.log('refreshアクションが呼び出されました', req.body)
    if (req.method === "GET") {
      const cookies = cookie.parse(req.headers.cookies ?? '')
      const access =  cookie.access ?? false

      if (access === false) {
        return res.status(403).json({error: "アクセストークンがありません",});
      }  

      const body = JSON.stringify({
        token: access,
      })

      try {
        console.log('try 処理開始', )
        const apiRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/verify/`, {
                method: "POST",
                headers: {'Content-Type': 'application/json',
            },
            body: body,
        })
        console.log(apiRes)
        const data = await apiRes.json();

        if (apiRes.status === 200) {
            console.log('if 通過')
            res.setHeader('Set-Cookie', [
              cookie.serialize('access', data.access,{
                httpOnly: false,
                secure: true,
                sameSite: 'Lax',
                maxAge: 60 * 60, // 1時間
              }),
            ])
            return res.status(200).json({success: "リフレッシュトークン取得に成功しました", })
        }  
        else {
          return res.status(apiRes.status).json({error: "リフレッシュトークン取得に失敗しました",});
        }
      } 
      catch (err) {
        console.log('catch 通過')
        return res.status(500).json({error: "リフレッシュトークン取得に失敗しました",});
      }
    } else {
      res.setHeader("Allow", ["GET "]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  };
