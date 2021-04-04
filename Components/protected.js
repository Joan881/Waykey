import Link from 'next/link'

const Protected = ({message}) => {
    return(
        <div>
            <div className="unauthorised-redirect">
                {message}
                <Link href="/api/auth/signin">
                    <a>Sign in</a>
                </Link>
            </div>
            
            <style jsx>{`
                .unauthorised-redirect{
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: sans-serif;
                    font-size: 1.5rem;
                }
                a{
                    color: #345cc9;
                }
            `}</style>
        </div>
    )
}

export default Protected