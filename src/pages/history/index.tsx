import { FC } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import { Static } from "@/components/static/Static";
import { getDetails } from "@/lib/services";
import { IStaticPages } from "@/lib/model/static";
import { Col, Row } from "antd";
import Cookies from "js-cookie";
import { localeString } from "@/lib/helpers/utils";
import { NextSeo } from "next-seo";

interface HistoryProps {
  pageData: IStaticPages;
}
const History: FC<HistoryProps> = ({ pageData }) => {
  const language: string | undefined = Cookies.get("language");

  return (
    <div>
      <NextSeo
        title={localeString(language, "publicLibraryHistory")}
        description={pageData?.description}
        openGraph={{
          title: "Public Library: History",
          description: pageData?.description,
          images: [
            {
              url: "/library_logo.svg",
              alt: "Public Library: History",
            },
          ],
        }}
      />
      <div className="pb-12">
        <div className="flex justify-center text-3xl mt-10 text-black font-normal">
          {localeString(language, "history")}
        </div>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
          >
            <Static pageData={pageData} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default History;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await getDetails(
    `public_library/pages`,
    "history",
    context?.req?.cookies?.["language"] || "bn"
  );

  if (res?.success) {
    return {
      props: {
        pageData: res?.data,
      },
    };
  } else {
    return {
      props: {
        pageData: {},
      },
    };
  }
};
