import Link from 'next/link'

export default function Navbar () {

    return (
        <>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                SEARCH
                            </Link>
                        </li>
                        <li>
                            <Link href="/chat">
                                CHAT
                            </Link>
                        </li>
                        <li>
                            <Link href="/innovate">
                                INNOVATE
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}