import logo from '../images/chef-claude-icon.png'

export function Header(){
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Chef Claude Logo" />
            <h1 className="logo-text">Chef Claude</h1>
        </header>
    )
}