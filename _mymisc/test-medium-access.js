// test-medium-access-builtin.js
// Uses Node.js built-in fetch (no dependencies required)

async function testMediumAccess() {
    const urls = [
      {
        name: 'Direct Medium RSS',
        url: 'https://medium.com/feed/@arjunagarwal899',
        type: 'xml'
      },
      {
        name: 'Alternative Medium Format',
        url: 'https://arjunagarwal899.medium.com/feed',
        type: 'xml'
      },
      {
        name: 'RSS2JSON API',
        url: 'https://api.rss2json.com/v1/api.json?rss_url=https%3A//medium.com/feed/@arjunagarwal899',
        type: 'json'
      }
    ];
  
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml, application/json',
      'Accept-Language': 'en-US,en;q=0.9'
    };
  
    console.log('🧪 Testing Medium RSS Feed Access...\n');
  
    for (const { name, url, type } of urls) {
      try {
        console.log(`📡 Testing: ${name}`);
        console.log(`🔗 URL: ${url}`);
        
        const startTime = Date.now();
        const response = await fetch(url, { headers });
        const duration = Date.now() - startTime;
        
        if (response.ok) {
          const data = await response.text();
          
          let postCount = 0;
          if (type === 'json') {
            try {
              const jsonData = JSON.parse(data);
              postCount = jsonData.items ? jsonData.items.length : 0;
              
              if (jsonData.status !== 'ok') {
                console.log(`⚠️  RSS2JSON Status: ${jsonData.status}`);
                if (jsonData.message) {
                  console.log(`📄 Message: ${jsonData.message}`);
                }
              }
            } catch (e) {
              postCount = 'Unknown (JSON parse error)';
            }
          } else {
            // Count <item> tags for XML
            const itemMatches = data.match(/<item>/g);
            postCount = itemMatches ? itemMatches.length : 0;
          }
          
          console.log(`✅ SUCCESS! Status: ${response.status}`);
          console.log(`⏱️  Response time: ${duration}ms`);
          console.log(`📄 Posts found: ${postCount}`);
          console.log(`📊 Content length: ${data.length} characters`);
          
          // Show first post title if available
          if (type === 'json') {
            try {
              const jsonData = JSON.parse(data);
              if (jsonData.items && jsonData.items[0]) {
                console.log(`📝 Latest post: "${jsonData.items[0].title}"`);
                console.log(`📅 Published: ${jsonData.items[0].pubDate}`);
              }
            } catch (e) {
              console.log(`⚠️  Could not parse JSON response`);
            }
          } else {
            const titleMatch = data.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
            if (titleMatch && titleMatch[1]) {
              console.log(`📝 Latest post: "${titleMatch[1]}"`);
            }
          }
          
        } else {
          console.log(`❌ FAILED! Status: ${response.status} ${response.statusText}`);
          console.log(`⏱️  Response time: ${duration}ms`);
          
          // Try to get error details
          try {
            const errorText = await response.text();
            if (errorText.length < 500) {
              console.log(`📄 Error details: ${errorText}`);
            }
          } catch (e) {
            // Ignore error getting error details
          }
        }
        
      } catch (error) {
        console.log(`💥 ERROR: ${error.message}`);
      }
      
      console.log('─'.repeat(60));
    }
  
    console.log('\n🔍 Analysis & Recommendations:');
    console.log('• If all fail: Medium profile might be private or all access is blocked');
    console.log('• If only RSS2JSON works: Use that as your primary method (most reliable)');
    console.log('• If direct RSS works: You can use the simpler original approach');
    console.log('• If getting 403 errors: Medium is actively blocking automated access');
    console.log('• Try running this test at different times - access patterns can vary');
    console.log('\n💡 Next Steps:');
    console.log('• Update your sync scripts to use whichever method works');
    console.log('• Consider manual post creation if all automated methods fail');
    console.log('• Check that your Medium profile is public and has published posts');
  }
  
  testMediumAccess().catch(console.error);