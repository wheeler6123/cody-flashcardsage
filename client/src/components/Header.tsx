import { Link } from 'react-router-dom'
import '../Header.css'

export function Header() {
    return (
        <>
            <div className="Header">
                <Link className='header-link' to='/'>LOGO</Link>
                <span>Flashcard Sage</span>
                <Link className='header-link' to='/'>Login</Link>
            </div>
        </>
    )
}