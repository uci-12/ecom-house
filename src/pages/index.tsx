import DashboardPage from "./dashboard";

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard",
    },
  };
};

// const Home = () => null;

export default DashboardPage;
