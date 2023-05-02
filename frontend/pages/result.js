import { useEffect } from 'react' 
import { useSelector, useDispatch } from 'react-redux' 
import { detail_checkout } from '../actions/auth' 
import { useRouter } from 'next/router' 
import Head from 'next/head'

const Result = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const checkout_detail = useSelector((state) => state.auth. checkout_detail)
    const session_id = router.query.session_id

    useEffect (() => {
        const fn = async () => {
            if (dispatch && dispatch !== null && dispatch !== undefined) {
                await dispatch(detail_checkout(session_id))
            }
            if (session_id) {
                fn()
            }
        }
    }, [session_id])

    return(
        <>
        <Head>
            <title>FINE | 決済完了</title>
        </Head>

        {session_id && (
            <div className='text-center'>
                <div className='test-2x1 mb-3'>{checkout_detail && checkout_detail.customer.name }様</div>
                <div className='test-2x1'>決済が完了しました</div>
            </div>
        )}
        </>
    )
}

export default Result