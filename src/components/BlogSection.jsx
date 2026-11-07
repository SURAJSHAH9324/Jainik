import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { getPublicBlog } from '../utils/api';

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [openId, setOpenId] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const rows = await getPublicBlog();
      if (!cancelled) setPosts(rows);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="journal" className="py-20 bg-[#FDFBF7] text-[#281A14] border-t border-[#D8C08A]/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3E8DD] border border-[#D8C08A] text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            Kitchen notes
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#241611]">From the Jainik kitchen</h2>
          <p className="text-sm text-[#3D2211]">
            These notes come from the server. When a note is published in admin, it shows up here.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-sm text-[#5C361D]">No published notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => {
              const open = openId === post.id;
              return (
                <article key={post.id || post.slug} className="bg-white border border-[#D8C08A]/50 rounded-2xl p-5">
                  <h3 className="text-lg font-black text-[#241611]">{post.title}</h3>
                  {post.created_at && (
                    <p className="text-[11px] text-[#8B4513] mt-1">
                      {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  )}
                  <p className="text-sm text-[#3D2211] mt-3">{open ? post.body : (post.excerpt || post.body)}</p>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? '' : post.id)}
                    className="mt-3 text-xs font-black text-[#241611]"
                  >
                    {open ? 'Show less' : 'Read note'}
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}