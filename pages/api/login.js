import cookie from 'cookie';

const handler = async (req, res) => {
    const { method, query, body } = req;
    const { token } = cookie.parse(req.headers.cookie || '');
    const { username, password } = body;
    if(method==='POST'){
        if(username===process.env.NEXT_PUBLIC_USERADMIN && password===process.env.NEXT_PUBLIC_PASSWORD){
            res.setHeader('Set-Cookie', cookie.serialize('token', process.env.NEXT_PUBLIC_TOKEN, {
                httpOnly: false,
                maxAge: 60 * 60,
                path: '/',
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            }));
            res.status(200).json({
                message: 'Login Success',
                token: process.env.NEXT_PUBLIC_TOKEN
            });
        }else{
            res.status(401).json({
                message: 'Login Failed'
            });
        }
    }
}

export default handler;