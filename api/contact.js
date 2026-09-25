// api/contact.js — Vercel serverless function
// Emails contact-form submissions via Resend. Needs RESEND_API_KEY set as a
// Vercel environment variable, and pmcrestoration.com verified as a sending
// domain in the Resend dashboard.
module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send('Method not allowed');
        return;
    }

    const body = req.body || {};
    const { name, phone, email, address, 'damage-type': damageType, emergency, message } = body;

    if (!name || !phone || !email) {
        res.status(400).send('Missing required fields');
        return;
    }

    const lines = [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Property Address: ${address || '(not provided)'}`,
        `Type of Damage: ${damageType || '(not provided)'}`,
        `Emergency: ${emergency || '(not provided)'}`,
        '',
        'Message:',
        message || '(none)',
    ];

    try {
        const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'PMC Restoration Website <website@pmcrestoration.com>',
                to: ['Info@pmcrestoration.com'],
                reply_to: email,
                subject: `New service request from ${name}`,
                text: lines.join('\n'),
            }),
        });

        if (!resendRes.ok) {
            console.error('Resend error:', await resendRes.text());
            res.status(502).send('Could not send your request. Please call us instead.');
            return;
        }
    } catch (err) {
        console.error('Contact form error:', err);
        res.status(500).send('Something went wrong. Please call us instead.');
        return;
    }

    res.writeHead(302, { Location: '/thank-you.html' });
    res.end();
}
