import DashboardPage from "./dashboard";

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/dashboard",
    },
  };
};

export default DashboardPage;
