// BB GENERAL PLUS – Cloudflare Worker
// Environment secrets: STRIPE_SK, ADMIN_HASH, AMAZON_KEY, etc.
addEventListener('fetch', e => e.respondWith(handle(e.request)))
async function handle(req){
  const u=new URL(req.url)
  if(u.pathname==='/api/create-checkout'){
    // stub checkout session
    return new Response(JSON.stringify({url:'https://checkout.stripe.com/pay/cs_test_123'}),{headers:{'Content-Type':'application/json'}})
  }
  if(u.pathname==='/admin/dashboard'){
    const auth=req.headers.get('Authorization')||''
    const [,creds]=auth.split(' ')
    const[user,pwd]=atob(creds||'').split(':')
    if(user!=='bbgeneralplus'||pwd!=='20257116') return new Response('Admin only',{status:401,headers:{'WWW-Authenticate':'Basic realm="BB GENERAL PLUS"'}})
    return new Response('<h1>BB GENERAL PLUS Admin</h1><p>Traffic $: $0.00</p><button onclick="alert(`kill switch`)" style="background:red;color:#fff">KILL SWITCH</button>')
  }
  // serve static files
  return fetch(req)
}
