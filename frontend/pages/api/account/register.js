export default async (req, res) => {
    console.log('registerアクションが呼び出されました', req.body)
    if (req.method === "POST") {
        const { name, email, password } = req.body;
        
        const body = JSON.stringify({name, email, password,});

        try {
            console.log('try 処理開始', )
            const apiRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json",},
                    body: body,
            }
        );
        const data = await apiRes.json();
        if (apiRes.status === 201) {
            console.log('if 通過 status 201: アカウント登録に成功しました')
          return res.status(200).json({success: "アカウント登録に成功しました",});
        }  
        else {
            console.log('if-else 通過 アカウント登録に失敗しました')
          return res.status(apiRes.status).json({error: "アカウント登録に失敗しました",});
        }
      } 
      catch (err) {
        console.log('catch 通過 アカウント登録に失敗しました')
        return res.status(500).json({error: "アカウント登録に失敗しました",});
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  };
