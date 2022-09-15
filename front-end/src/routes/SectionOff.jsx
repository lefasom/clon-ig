import { Link , Outlet } from "react-router-dom"

const SectionOff = () => {
  return (
    <>
      <nav>
        <Link id="itemNav" to="/Login">Login</Link>
        <Link id="itemNav" to="/Home">Home</Link>

      </nav>
      <Outlet />
      {/*el outlet importantisimo*/}
    </>
  )
}
export default SectionOff;


