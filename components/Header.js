import { Container, Navbar, Nav } from 'react-bootstrap'

function renderNavs(navs) {
  let navItems = [];
  for (let i = 0; i < navs.length; i++) {
    const nav = navs[i];
    navItems.push(
      <Nav.Link
        key={'nav-' + i}
        href={nav.href}
      >
        {nav.name}
      </Nav.Link>
    );
  }
  return navItems;
}

export default function Header() {
  const navs = process.env.header.navs;
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand href="/">
          {process.env.header.name}
        </Navbar.Brand>
        <Nav className="mr-auto">
          {renderNavs(navs)}
        </Nav>
      </Container>
    </Navbar>
  )
}