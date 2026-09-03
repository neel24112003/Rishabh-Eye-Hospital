import fetch from 'node-[#fetch]';
// Test Cloud JSON Store
async function testCloudDb() {
  try {
    // Test npoint.io bin creation or JSONBin.io / REST API
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$7Z/YQ2jL...dummy' // testing
      },
      body: JSON.stringify({ test: true })
    });
    console.log("Status:", res.status);
  } catch (e) {
    console.error("Err:", e.message);
  }
}
