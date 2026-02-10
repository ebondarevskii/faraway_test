import { Col, Row } from 'antd'
import { CharacterCard } from '@components/CharacterCard'
import type { SwapiPerson } from '@app-types/swapi'

type CharacterGridProps = {
  people: SwapiPerson[]
  detailsQuery?: string
}

export const CharacterGrid = ({ people, detailsQuery }: CharacterGridProps) => {
  return (
    <Row gutter={[24, 24]}>
      {people.map((person) => (
        <Col key={person.url} xs={24} sm={12} lg={8}>
          <CharacterCard person={person} detailsQuery={detailsQuery} />
        </Col>
      ))}
    </Row>
  )
}
