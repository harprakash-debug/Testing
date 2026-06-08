import { useEffect, useState } from "react";
import api from '../services/api'

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f0f2f5; }
  .wrap { min-height: 100vh; background: #f0f2f5; padding: 32px; font-family: 'DM Sans', sans-serif; }
  .page-title { font-size: 1.4rem; font-weight: 600; color: #111827; margin-bottom: 4px; letter-spacing: -0.02em; }
  .page-sub { font-size: 0.8rem; color: #9ca3af; margin-bottom: 24px; }
  .card { background: #fff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03); }
  .toolbar { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid #f3f4f6; flex-wrap: wrap; }
  .search-box { position: relative; flex: 1; min-width: 200px; max-width: 320px; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
  .search-input { width: 100%; padding: 9px 12px 9px 36px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #111827; background: #fafafa; outline: none; }
  .search-input::placeholder { color: #c4c9d4; }
  .filter-select { padding: 9px 32px 9px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #374151; background: #fafafa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 10px center; appearance: none; outline: none; }
  .toolbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }
  .rows-label { font-size: 0.78rem; color: #9ca3af; white-space: nowrap; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.83rem; }
  thead tr { background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
  th { padding: 11px 16px; text-align: left; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: #6b7280; white-space: nowrap; }
  tbody tr { border-bottom: 1px solid #f3f4f6; transition: background 0.12s; }
  tbody tr:last-child { border-bottom: none; }
  tbody tr:hover { background: #fafbff; }
  td { padding: 13px 16px; color: #374151; vertical-align: middle; }
  .td-id { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: #9ca3af; }
  .td-name { font-weight: 500; color: #111827; }
  .td-email { color: #6b7280; font-size: 0.8rem; }
  .td-amount { font-family: 'DM Mono', monospace; font-size: 0.82rem; font-weight: 500; color: #111827; }
  .badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em; }
  .badge-dot { width: 5px; height: 5px; border-radius: 50%; }
  .badge-approved { background: #ecfdf5; color: #059669; } .badge-approved .badge-dot { background: #059669; }
  .badge-pending  { background: #fffbeb; color: #d97706; } .badge-pending  .badge-dot { background: #d97706; }
  .badge-rejected { background: #fef2f2; color: #dc2626; } .badge-rejected .badge-dot { background: #dc2626; }
  .badge-review   { background: #eff6ff; color: #2563eb; } .badge-review   .badge-dot { background: #2563eb; }
  .avatar { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 600; color: #fff; margin-right: 8px; flex-shrink: 0; }
  .name-cell { display: flex; align-items: center; }
  .action-btn { padding: 5px 10px; border: 1.5px solid #e5e7eb; border-radius: 6px; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 0.72rem; color: #6b7280; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
  .action-btn:hover { border-color: #6366f1; color: #6366f1; }
  .footer { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-top: 1px solid #f3f4f6; flex-wrap: wrap; gap: 10px; }
  .footer-info { font-size: 0.78rem; color: #9ca3af; }
  .pagination { display: flex; align-items: center; gap: 4px; }
  .page-btn { min-width: 32px; height: 32px; padding: 0 8px; border: 1.5px solid #e5e7eb; border-radius: 7px; background: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.8rem; color: #374151; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
  .page-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; font-weight: 600; }
  .page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const CHIP_STYLES = {
  all: { color: "#6366f1", bg: "#6366f118", border: "#6366f1", countBg: "#6366f1", countColor: "#fff" },
  approved: { color: "#059669", bg: "#fff", border: "#e5e7eb", countBg: "#f3f4f6", countColor: "#9ca3af" },
  pending: { color: "#d97706", bg: "#fff", border: "#e5e7eb", countBg: "#f3f4f6", countColor: "#9ca3af" },
  review: { color: "#2563eb", bg: "#fff", border: "#e5e7eb", countBg: "#f3f4f6", countColor: "#9ca3af" },
  rejected: { color: "#dc2626", bg: "#fff", border: "#e5e7eb", countBg: "#f3f4f6", countColor: "#9ca3af" },
};

export default function OrderTable() {
  const [listing, setListing] = useState([]);
  const [paginate, setPaginate] = useState(0);

  const changePaginate = (value) => {
    userListing(`categories?page=${value}`)

  }

  const userListing = async (url = 'categories') => {
    const response = await api.get(url);
    console.log(response.data.data)
    if (response?.data?.data?.data) {
      setListing(response.data.data.data)
      setPaginate(Math.floor(response.data.data.total / 70000))

    }
  }
  useEffect(() => {
    userListing()
  }, []);



  return (
    <>
      <style>{STYLES}</style>
      <div className="wrap">

        <div className="page-title">Order Management</div>
        <div className="page-sub">Manage and track all transactions in one place</div>

        {/* Status Chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {[
            { key: "all", label: "All", count: 20 },
            { key: "approved", label: "Approved", count: 8 },
            { key: "pending", label: "Pending", count: 5 },
            { key: "review", label: "Review", count: 4 },
            { key: "rejected", label: "Rejected", count: 3 },
          ].map(({ key, label, count }) => {
            const s = CHIP_STYLES[key];
            return (
              <div key={key} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${s.border}`, background: s.bg, color: s.color, fontFamily: "'DM Sans',sans-serif", fontSize: "0.76rem", fontWeight: 600 }}>
                {label}
                <span style={{ marginLeft: 6, padding: "1px 6px", borderRadius: 10, background: s.countBg, color: s.countColor, fontSize: "0.65rem", fontWeight: 700 }}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>

        <div className="card">

          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input className="search-input" type="text" placeholder="Search name, email or ID…" readOnly />
            </div>

            <select className="filter-select" defaultValue="all">
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="review">Under Review</option>
              <option value="rejected">Rejected</option>
            </select>

            <div className="toolbar-right">
              <span className="rows-label">Rows:</span>
              <select className="filter-select" defaultValue="10">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" style={{ accentColor: "#6366f1" }} /></th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Date</th>
                  {/* <th>Status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  listing.map((item) => (
                    <tr key={item.id}>
                      <td><input type="checkbox" style={{ accentColor: "#6366f1" }} /></td>
                      <td><div className="name-cell"><span className="avatar" style={{ background: "#6366f1" }}>AM</span><span className="td-name">{item.name}</span></div></td>
                      <td className="td-email">{item.email}</td>
                      <td style={{ color: "#6b7280", fontSize: "0.8rem" }}>{item.created_at}</td>
                      {/* <td><span className="badge badge-approved"><span className="badge-dot" />Approved</span></td> */}
                      <td><div style={{ display: "flex", gap: 6 }}><button className="action-btn">View</button><button className="action-btn">Edit</button></div></td>
                    </tr>
                  ))
                }


              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="footer">
            <span className="footer-info">Showing 1–20 of 20 results</span>
            <div className="pagination">
              <button className="page-btn" disabled>«</button>
              <button className="page-btn" disabled>‹</button>
              {
                Array.from({ length: paginate }, (_, index) => (
                  <button onClick={() => changePaginate(index + 1)} key={index + 1} className="page-btn">{index + 1}</button>
                ))
              }

              <button className="page-btn" disabled>›</button>
              <button className="page-btn" disabled>»</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}