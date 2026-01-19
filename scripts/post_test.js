(async () => {
  try {
    const res = await fetch('http://localhost:3001/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Post (script)',
        description: 'Created by automated test script',
        content: 'This is a test blog created via scripts/post_test.js',
        category: ['TEST'],
        date: new Date().toISOString(),
        coverImage: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg'
      }),
    })
    const data = await res.json()
    console.log('Created:', JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error:', err)
  }
})()
