import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome to Broadway",
  description = "Test description",
  keyword = "ecommerce, broadway",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keyword} />
    </Helmet>
  );
};

export default Meta;
