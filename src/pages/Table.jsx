import { useState, useMemo } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #f0f2f5; }

  .wrap {
    min-height: 100vh;
    background: #f0f2f5;
    padding: 32px;
    font-family: 'DM Sans', sans-serif;
  }

  .page-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 4px;
    letter-spacing: -0.02em;
  }

  .page-sub {
    font-size: 0.8rem;
    color: #9ca3af;
    margin-bottom: 24px;
  }

  .card {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
  }

  /* Toolbar */
  .toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 20px;
    border-bottom: 1px solid #f3f4f6;
    flex-wrap: wrap;
  }

  .search-box {
    position: relative;
    flex: 1;
    min-width: 200px;
    max-width: 320px;
  }

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    padding: 9px 12px 9px 36px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #111827;
    background: #fafafa;
    outline: none;
    transition: border-color 0.15s, background 0.15s;
  }
  .search-input:focus { border-color: #6366f1; background: #fff; }
  .search-input::placeholder { color: #c4c9d4; }

  .filter-select {
    padding: 9px 32px 9px 12px;
    border: 1.5px solid #e5e7eb;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #374151;
    background: #fafafa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 10px center;
    appearance: none;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .filter-select:focus { border-color: #6366f1; background-color: #fff; }

  .toolbar-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rows-label {
    font-size: 0.78rem;
    color: #9ca3af;
    white-space: nowrap;
  }

  /* Table */
  .table-wrap { overflow-x: auto; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.83rem;
  }

  thead tr {
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    padding: 11px 16px;
    text-align: left;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: #6b7280;
    white-space: nowrap;
    user-select: none;
  }

  th.sortable { cursor: pointer; }
  th.sortable:hover { color: #111827; }

  .sort-icon { display: inline-flex; flex-direction: column; gap: 1px; margin-left: 5px; vertical-align: middle; }
  .sort-arrow { width: 0; height: 0; border-left: 3.5px solid transparent; border-right: 3.5px solid transparent; }
  .sort-up { border-bottom: 4px solid currentColor; }
  .sort-down { border-top: 4px solid currentColor; }
  .sort-active { color: #6366f1; }

  tbody tr {
    border-bottom: 1px solid #f3f4f6;
    transition: background 0.12s;
  }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafbff; }

  td {
    padding: 13px 16px;
    color: #374151;
    vertical-align: middle;
  }

  .td-id {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .td-name { font-weight: 500; color: #111827; }

  .td-email { color: #6b7280; font-size: 0.8rem; }

  .td-amount {
    font-family: 'DM Mono', monospace;
    font-size: 0.82rem;
    font-weight: 500;
    color: #111827;
  }

  /* Status badges */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }
  .badge-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
  }
  .badge-approved { background: #ecfdf5; color: #059669; }
  .badge-approved .badge-dot { background: #059669; }
  .badge-pending  { background: #fffbeb; color: #d97706; }
  .badge-pending  .badge-dot { background: #d97706; }
  .badge-rejected { background: #fef2f2; color: #dc2626; }
  .badge-rejected .badge-dot { background: #dc2626; }
  .badge-review   { background: #eff6ff; color: #2563eb; }
  .badge-review   .badge-dot { background: #2563eb; }

  /* Avatar */
  .avatar {
    width: 30px; height: 30px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fff;
    margin-right: 8px;
    flex-shrink: 0;
  }

  .name-cell { display: flex; align-items: center; }

  /* Action button */
  .action-btn {
    padding: 5px 10px;
    border: 1.5px solid #e5e7eb;
    border-radius: 6px;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: #6b7280;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .action-btn:hover { border-color: #6366f1; color: #6366f1; }

  /* Empty state */
  .empty {
    padding: 60px 20px;
    text-align: center;
    color: #9ca3af;
    font-size: 0.85rem;
  }
  .empty-icon { font-size: 2rem; margin-bottom: 8px; }

  /* Footer */
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-top: 1px solid #f3f4f6;
    flex-wrap: wrap;
    gap: 10px;
  }

  .footer-info {
    font-size: 0.78rem;
    color: #9ca3af;
  }

  .pagination {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .page-btn {
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 1.5px solid #e5e7eb;
    border-radius: 7px;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    color: #374151;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.12s;
  }
  .page-btn:hover:not(:disabled) { border-color: #6366f1; color: #6366f1; }
  .page-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; font-weight: 600; }
  .page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const COLORS = ["#6366f1","#ec4899","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ef4444","#14b8a6","#f97316","#06b6d4"];

const RAW_DATA = [
  { id:"TXN-001", name:"Arjun Mehta",    email:"arjun@mail.com",   amount:"₹12,400", date:"2024-06-01", status:"approved" },
  { id:"TXN-002", name:"Priya Sharma",   email:"priya@mail.com",   amount:"₹8,750",  date:"2024-06-02", status:"pending"  },
  { id:"TXN-003", name:"Rahul Gupta",    email:"rahul@mail.com",   amount:"₹21,000", date:"2024-06-03", status:"review"   },
  { id:"TXN-004", name:"Sneha Patel",    email:"sneha@mail.com",   amount:"₹5,300",  date:"2024-06-04", status:"rejected" },
  { id:"TXN-005", name:"Vikram Singh",   email:"vikram@mail.com",  amount:"₹15,600", date:"2024-06-05", status:"approved" },
  { id:"TXN-006", name:"Ananya Iyer",    email:"ananya@mail.com",  amount:"₹9,200",  date:"2024-06-06", status:"pending"  },
  { id:"TXN-007", name:"Karan Malhotra", email:"karan@mail.com",   amount:"₹33,100", date:"2024-06-07", status:"approved" },
  { id:"TXN-008", name:"Divya Nair",     email:"divya@mail.com",   amount:"₹7,450",  date:"2024-06-08", status:"review"   },
  { id:"TXN-009", name:"Rohan Joshi",    email:"rohan@mail.com",   amount:"₹18,800", date:"2024-06-09", status:"pending"  },
  { id:"TXN-010", name:"Meera Reddy",    email:"meera@mail.com",   amount:"₹11,250", date:"2024-06-10", status:"approved" },
  { id:"TXN-011", name:"Amit Kumar",     email:"amit@mail.com",    amount:"₹6,900",  date:"2024-06-11", status:"rejected" },
  { id:"TXN-012", name:"Pooja Verma",    email:"pooja@mail.com",   amount:"₹24,500", date:"2024-06-12", status:"approved" },
  { id:"TXN-013", name:"Siddharth Das",  email:"sid@mail.com",     amount:"₹13,700", date:"2024-06-13", status:"pending"  },
  { id:"TXN-014", name:"Lakshmi Rao",    email:"lakshmi@mail.com", amount:"₹30,000", date:"2024-06-14", status:"review"   },
  { id:"TXN-015", name:"Nikhil Bose",    email:"nikhil@mail.com",  amount:"₹4,150",  date:"2024-06-15", status:"approved" },
  { id:"TXN-016", name:"Ritu Agarwal",   email:"ritu@mail.com",    amount:"₹17,300", date:"2024-06-16", status:"pending"  },
  { id:"TXN-017", name:"Harish Pillai",  email:"harish@mail.com",  amount:"₹22,800", date:"2024-06-17", status:"rejected" },
  { id:"TXN-018", name:"Swati Kapoor",   email:"swati@mail.com",   amount:"₹9,600",  date:"2024-06-18", status:"approved" },
  { id:"TXN-019", name:"Ajay Saxena",    email:"ajay@mail.com",    amount:"₹14,200", date:"2024-06-19", status:"review"   },
  { id:"TXN-020", name:"Neha Chowdhury", email:"neha@mail.com",    amount:"₹28,900", date:"2024-06-20", status:"approved" },
];

const amountVal = s => parseInt(s.replace(/[₹,]/g, ""));

const SortIcon = ({ col, sortCol, sortDir }) => (
  <span className="sort-icon">
    <span className={`sort-arrow sort-up ${sortCol===col && sortDir==="asc" ? "sort-active" : ""}`} style={{ opacity: sortCol===col && sortDir==="asc" ? 1 : 0.25 }} />
    <span className={`sort-arrow sort-down ${sortCol===col && sortDir==="desc" ? "sort-active" : ""}`} style={{ opacity: sortCol===col && sortDir==="desc" ? 1 : 0.25 }} />
  </span>
);

const Badge = ({ status }) => (
  <span className={`badge badge-${status}`}>
    <span className="badge-dot" />
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

const Avatar = ({ name, idx }) => (
  <span className="avatar" style={{ background: COLORS[idx % COLORS.length] }}>
    {name.split(" ").map(w => w[0]).join("").slice(0,2)}
  </span>
);

export default function Table() {
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("all");
  const [rowsPerPage, setRows]  = useState(10);
  const [page, setPage]         = useState(1);
  const [sortCol, setSortCol]   = useState("date");
  const [sortDir, setSortDir]   = useState("desc");

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
    setPage(1);
  };

  const filtered = useMemo(() => {
    let d = RAW_DATA;
    if (status !== "all") d = d.filter(r => r.status === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(r => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
    }
    d = [...d].sort((a, b) => {
      let av = a[sortCol], bv = b[sortCol];
      if (sortCol === "amount") { av = amountVal(a.amount); bv = amountVal(b.amount); }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return d;
  }, [search, status, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage   = Math.min(page, totalPages);
  const pageData   = filtered.slice((safePage-1)*rowsPerPage, safePage*rowsPerPage);

  const goPage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  const pageNums = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= safePage-1 && i <= safePage+1)) pages.push(i);
      else if (pages[pages.length-1] !== "...") pages.push("...");
    }
    return pages;
  };

  const statusCounts = useMemo(() => {
    const c = { all: RAW_DATA.length, approved:0, pending:0, review:0, rejected:0 };
    RAW_DATA.forEach(r => c[r.status]++);
    return c;
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <div className="wrap">
        <div className="page-title">Order Management</div>
        <div className="page-sub">Manage and track all transactions in one place</div>

        {/* Status chips */}
        <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
          {[
            { key:"all",      label:"All",      color:"#6366f1" },
            { key:"approved", label:"Approved", color:"#059669" },
            { key:"pending",  label:"Pending",  color:"#d97706" },
            { key:"review",   label:"Review",   color:"#2563eb" },
            { key:"rejected", label:"Rejected", color:"#dc2626" },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => { setStatus(s.key); setPage(1); }}
              style={{
                padding:"6px 14px", borderRadius:20,
                border:`1.5px solid ${status===s.key ? s.color : "#e5e7eb"}`,
                background: status===s.key ? s.color+"18" : "#fff",
                color: status===s.key ? s.color : "#6b7280",
                fontFamily:"'DM Sans',sans-serif", fontSize:"0.76rem", fontWeight:600,
                cursor:"pointer", transition:"all 0.15s",
              }}
            >
              {s.label}
              <span style={{
                marginLeft:6, padding:"1px 6px", borderRadius:10,
                background: status===s.key ? s.color : "#f3f4f6",
                color: status===s.key ? "#fff" : "#9ca3af",
                fontSize:"0.65rem", fontWeight:700,
              }}>
                {statusCounts[s.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="card">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                className="search-input"
                type="text"
                placeholder="Search name, email or ID…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>

            <select className="filter-select" value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="review">Under Review</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="toolbar-right">
              <span className="rows-label">Rows:</span>
              <select className="filter-select" value={rowsPerPage} onChange={e => { setRows(Number(e.target.value)); setPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" style={{ accentColor:"#6366f1" }} />
                  </th>
                  <th className="sortable" onClick={() => toggleSort("id")}>
                    Order ID <SortIcon col="id" sortCol={sortCol} sortDir={sortDir} />
                  </th>
                  <th className="sortable" onClick={() => toggleSort("name")}>
                    Customer <SortIcon col="name" sortCol={sortCol} sortDir={sortDir} />
                  </th>
                  <th className="sortable" onClick={() => toggleSort("email")}>
                    Email <SortIcon col="email" sortCol={sortCol} sortDir={sortDir} />
                  </th>
                  <th className="sortable" onClick={() => toggleSort("amount")}>
                    Amount <SortIcon col="amount" sortCol={sortCol} sortDir={sortDir} />
                  </th>
                  <th className="sortable" onClick={() => toggleSort("date")}>
                    Date <SortIcon col="date" sortCol={sortCol} sortDir={sortDir} />
                  </th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pageData.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="empty">
                        <div className="empty-icon">🔍</div>
                        No records found
                      </div>
                    </td>
                  </tr>
                ) : pageData.map((row, i) => {
                  const globalIdx = RAW_DATA.findIndex(r => r.id === row.id);
                  return (
                    <tr key={row.id}>
                      <td><input type="checkbox" style={{ accentColor:"#6366f1" }} /></td>
                      <td className="td-id">{row.id}</td>
                      <td>
                        <div className="name-cell">
                          <Avatar name={row.name} idx={globalIdx} />
                          <span className="td-name">{row.name}</span>
                        </div>
                      </td>
                      <td className="td-email">{row.email}</td>
                      <td className="td-amount">{row.amount}</td>
                      <td style={{ color:"#6b7280", fontSize:"0.8rem" }}>{row.date}</td>
                      <td><Badge status={row.status} /></td>
                      <td>
                        <div style={{ display:"flex", gap:6 }}>
                          <button className="action-btn">View</button>
                          <button className="action-btn">Edit</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="footer">
            <span className="footer-info">
              Showing {filtered.length === 0 ? 0 : (safePage-1)*rowsPerPage+1}–{Math.min(safePage*rowsPerPage, filtered.length)} of {filtered.length} results
            </span>
            <div className="pagination">
              <button className="page-btn" onClick={() => goPage(1)} disabled={safePage===1}>«</button>
              <button className="page-btn" onClick={() => goPage(safePage-1)} disabled={safePage===1}>‹</button>
              {pageNums().map((p, i) =>
                p === "..." ? (
                  <span key={i} style={{ padding:"0 4px", color:"#9ca3af", fontSize:"0.8rem" }}>…</span>
                ) : (
                  <button key={p} className={`page-btn${safePage===p?" active":""}`} onClick={() => goPage(p)}>{p}</button>
                )
              )}
              <button className="page-btn" onClick={() => goPage(safePage+1)} disabled={safePage===totalPages}>›</button>
              <button className="page-btn" onClick={() => goPage(totalPages)} disabled={safePage===totalPages}>»</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}