const BASE = 'http://localhost:8000/api'

async function get(path){
  const res = await fetch(BASE + path)
  return res.json()
}

export default { get }
