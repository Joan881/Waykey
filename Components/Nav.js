import Link from 'next/link'
import { signIn,signOut,useSession } from 'next-auth/client'

const Nav = () => {
    const [session,loading] = useSession()
    return(
        <nav>
            <Link href="/">
                <h1 style={{cursor: 'pointer'}}>WayKey</h1>
            </Link>
            <div>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <a href="#team">Our Team</a>
                {session && session.user.type && <>
                <Link href="/dashboard">
                    <a>Dashboard</a>
                </Link>
                </>}
                <Link href="/book-a-service">
                <a>Book a service</a>
                </Link>
                {!session && <>
                <Link href="/api/auth/signin">
                    <a>Sign in</a>
                </Link>
                </>} 
                {session && <>
                <Link href="">
                    <a onClick={() => signOut()}>Sign out</a>
                </Link>
                </>} 
            </div>
        </nav>
    )
}

export default Nav