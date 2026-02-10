import { Button, Card, Typography } from "antd";
import { Link as RouterLink } from "react-router-dom";
import { getPersonId } from "@api/swapi";
import type { SwapiPerson } from "@app-types/swapi";

type CharacterCardProps = {
  person: SwapiPerson;
  detailsQuery?: string;
};

export const CharacterCard = ({
  person,
  detailsQuery = "",
}: CharacterCardProps) => {
  const id = getPersonId(person.url);

  return (
    <Card
      title={
        <Typography.Title level={4} className="mb-0! font-semibold!">
          {person.name}
        </Typography.Title>
      }
      className="h-full border border-yellow-400/20 bg-black/60 shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
      actions={[
        <span key="details" className="block px-3">
          <RouterLink
            to={`/people/${id}${detailsQuery}`}
            className="block w-full"
          >
            <Button type="primary" size="large" block>
              Details
            </Button>
          </RouterLink>
        </span>,
      ]}
    >
      <div className="flex flex-col gap-2">
        <Typography.Text type="secondary" className="text-base!">
          Gender: {person.gender}
        </Typography.Text>
        <Typography.Text type="secondary" className="text-base!">
          Birth year: {person.birth_year}
        </Typography.Text>
        <Typography.Text type="secondary" className="text-base!">
          Height: {person.height} cm
        </Typography.Text>
      </div>
    </Card>
  );
};
