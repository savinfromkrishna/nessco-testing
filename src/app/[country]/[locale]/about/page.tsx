interface Person {
  id: string
  name: string
  createdAt: string
}

async function getAboutInfo() {
  const res = await fetch('https://677f5fb70476123f76a625b0.mockapi.io/api/v1/about', 
    { next: { tags: ['about'] } }
  )
  if (!res.ok) {
    throw new Error('Failed to fetch about info')
  }
  return res.json()
}

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <h2 className="text-xl font-semibold">{person.name}</h2>
      <p className="text-gray-600">ID: {person.id}</p>
      <p className="text-gray-600">Joined: {new Date(person.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default async function About() {
  const aboutInfo = await getAboutInfo()
  const timestamp = new Date().toLocaleString()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="mb-4">Last updated: {timestamp}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutInfo.map((person: Person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}

