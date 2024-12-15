import { Link } from "react-router-dom";

function NavBar(){
    return (
        <nav className="navContainer">
            <Link to ="/">
                <img src="../assets/react.svg" />
            </Link>
            <Link to ="/courses">Courses</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/scholarships">Scholarships</Link>
            <Link to="/testseries">Test Series</Link>
            <Link to="/results">Results</Link>
            <Link to="/studymaterial">Study Material</Link>
            <Link to="/aboutus">About us</Link>
        </nav>
    )
}

export default NavBar