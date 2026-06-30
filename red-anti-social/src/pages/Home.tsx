import Hero from "../components/Hero";
import PostsHome from "../components/PostsHome";
import "../style/Home.css";

function Home() {
  return (
    <div className="container-home">
      <Hero />
      <PostsHome />
    </div>
  );
}

export default Home;
