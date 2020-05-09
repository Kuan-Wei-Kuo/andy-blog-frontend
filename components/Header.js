import { Container, Navbar, Nav } from 'react-bootstrap'

export default function Header() {
    const navs = process.env.blog.navs;
    let navItems = [];
    for(let i = 0 ; i < navs.length ; i++) {
        const nav = navs[i];
        navItems.push(<Nav.Link key={ 'nav-' + i } href={ nav.href }>{ nav.name }</Nav.Link>);
    }
    return (
        <Navbar bg="dark" variant="dark" className="mb-4">
            <Container>
                <Navbar.Brand href="/">{ process.env.blog.name }</Navbar.Brand>
                <Nav className="justify-content-end">
                    { navItems }
                </Nav>
            </Container>
        </Navbar>
    )
}