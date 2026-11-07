import React, { useEffect, useState } from 'react';
import { adminApiCall } from '../../utils/api';

const emptyForm = { id: '', title: '', excerpt: '', body: '', published: true };

export default function BlogManager({ token }) {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const rows = await adminApiCall('/api/admin/blog', 'GET', token);
    setPosts(Array.isArray(rows) ? rows : []);
  };

  useEffect(() => {
    load().catch((err) => setMessage(err.message));
  }, [token]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        body: form.body,
        published: form.published,
      };
      if (form.id) {
        await adminApiCall(`/api/admin/blog/${form.id}`, 'PATCH', token, payload);
        setMessage('Note updated. Published notes show on the website.');
      } else {
        await adminApiCall('/api/admin/blog', 'POST', token, payload);
        setMessage('Note saved. Published notes show on the website.');
      }
      setForm(emptyForm);
      await load();
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    await adminApiCall(`/api/admin/blog/${id}`, 'DELETE', token);
    if (form.id === id) setForm(emptyForm);
    await load();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={save} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2 shadow-sm">
        <h3 className="text-sm font-black text-gray-900">{form.id ? 'Edit kitchen note' : 'New kitchen note'}</h3>
        <input
          required
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />
        <input
          placeholder="Short line for the card"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm"
        />
        <textarea
          required
          rows={5}
          placeholder="Full note"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none"
        />
        <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Show on the website
        </label>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="px-4 py-2 rounded-xl bg-[#241611] text-[#C9A46C] text-xs font-black">
            {saving ? 'Saving...' : 'Save note'}
          </button>
          {form.id && (
            <button type="button" onClick={() => setForm(emptyForm)} className="px-4 py-2 rounded-xl border text-xs font-bold">
              Cancel edit
            </button>
          )}
        </div>
        {message && <p className="text-xs text-gray-600">{message}</p>}
      </form>

      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-black text-gray-900">{post.title}</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {post.published ? 'Live on the site' : 'Hidden'} • {post.slug}
              </p>
              <p className="text-xs text-gray-600 mt-2">{post.excerpt || post.body}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setForm({
                  id: post.id,
                  title: post.title,
                  excerpt: post.excerpt || '',
                  body: post.body || '',
                  published: Boolean(post.published),
                })}
                className="text-xs font-black text-[#241611]"
              >
                Edit
              </button>
              <button type="button" onClick={() => remove(post.id)} className="text-xs font-black text-rose-600">
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
