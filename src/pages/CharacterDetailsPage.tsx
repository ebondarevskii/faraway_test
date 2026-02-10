import { Button, Card, Col, Input, Row, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Control } from "react-hook-form";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { getPerson } from "@api/swapi";
import { BirthYearField } from "@components/BirthYearField";
import { ErrorState } from "@components/ErrorState";
import { LoadingState } from "@components/LoadingState";
import {
  clearLocalEdits,
  getLocalEdits,
  saveLocalEdits,
} from "@lib/localEdits";
import type { EditablePersonFields, SwapiPerson } from "@app-types/swapi";

const pickEditableFields = (person: SwapiPerson): EditablePersonFields => ({
  name: person.name,
  height: person.height,
  mass: person.mass,
  hair_color: person.hair_color,
  skin_color: person.skin_color,
  eye_color: person.eye_color,
  birth_year: person.birth_year,
  gender: person.gender,
});

const emptyEditableFields: EditablePersonFields = {
  name: "",
  height: "",
  mass: "",
  hair_color: "",
  skin_color: "",
  eye_color: "",
  birth_year: "",
  gender: "",
};

const formFields: {
  name: keyof EditablePersonFields;
  label: string;
  type?: "text" | "year";
}[] = [
  { name: "name", label: "Name" },
  { name: "gender", label: "Gender" },
  { name: "birth_year", label: "Birth year", type: "year" },
  { name: "height", label: "Height (cm)" },
  { name: "mass", label: "Mass" },
  { name: "hair_color", label: "Hair color" },
  { name: "skin_color", label: "Skin color" },
  { name: "eye_color", label: "Eye color" },
];

const FormField = ({
  control,
  name,
  label,
  type = "text",
}: {
  control: Control<EditablePersonFields>;
  name: keyof EditablePersonFields;
  label: string;
  type?: "text" | "year";
}) => (
  <Col xs={24} sm={12}>
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>
        <Typography.Text>{label}</Typography.Text>
      </label>
      {type === "year" ? (
        <Controller
          control={control}
          name="birth_year"
          render={({ field }) => (
            <BirthYearField
              id={name}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      ) : (
        <Controller
          control={control}
          name={name}
          render={({ field }) => <Input id={name} {...field} />}
        />
      )}
    </div>
  </Col>
);

export const CharacterDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [localEdits, setLocalEdits] = useState<EditablePersonFields | null>(
    null,
  );

  const query = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(id ?? ""),
    enabled: Boolean(id),
  });

  const { control, handleSubmit, reset, formState } =
    useForm<EditablePersonFields>({
      defaultValues: emptyEditableFields,
    });

  const mergedValues = useMemo(() => {
    if (!query.data) {
      return emptyEditableFields;
    }
    return {
      ...pickEditableFields(query.data),
      ...(localEdits ?? {}),
    };
  }, [localEdits, query.data]);

  useEffect(() => {
    if (!id) {
      return;
    }

    setLocalEdits(getLocalEdits(id));
  }, [id]);

  useEffect(() => {
    if (query.data) {
      reset(mergedValues);
    }
  }, [mergedValues, query.data, reset]);

  if (!id) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <ErrorState description="Missing character id" />
      </div>
    );
  }

  if (query.isPending) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <LoadingState message="Loading..." />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <ErrorState
          description={
            query.error instanceof Error
              ? query.error.message
              : "Couldn't load character"
          }
        />
      </div>
    );
  }

  const backTo = location.search ? `/${location.search}` : "/";
  const displayName = mergedValues.name || query.data.name;

  const handleSave = (data: EditablePersonFields) => {
    saveLocalEdits(id, data);
    setLocalEdits(data);
  };

  const handleReset = () => {
    clearLocalEdits(id);
    setLocalEdits(null);
    reset(pickEditableFields(query.data));
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Typography.Title
              level={2}
              className="mb-1! text-yellow-300 drop-shadow-[0_0_18px_rgba(245,197,24,0.25)]"
            >
              {displayName}
            </Typography.Title>
            <Typography.Text type="secondary">Edit and save</Typography.Text>
          </div>
          <Button>
            <RouterLink to={backTo}>Back to list</RouterLink>
          </Button>
        </div>

        <Card className="border border-yellow-400/20 bg-black/60 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-4">
            <div>
              <Typography.Title level={4} className="mb-1!">
                Editable fields
              </Typography.Title>
              <Typography.Text type="secondary">
                Local storage only
              </Typography.Text>
            </div>
            <form onSubmit={handleSubmit(handleSave)}>
              <Row gutter={[24, 24]}>
                {formFields.map(({ name, label, type }) => (
                  <FormField
                    key={name}
                    control={control}
                    name={name}
                    label={label}
                    type={type}
                  />
                ))}
              </Row>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!formState.isDirty}
                >
                  Save locally
                </Button>
                <Button
                  onClick={handleReset}
                  disabled={localEdits === null && !formState.isDirty}
                >
                  Reset local changes
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
