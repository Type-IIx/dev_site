import Link from "next/link";








export default function SubmissionSideBar({ title }) {
  return <>
    <aside className="sidebar sticky-top">
      <div class="sidebar-widget-two category-widget-two">
        <div class="widget-content">
          <div class="sidebar-title-two">
            <h5>Formdata</h5>
          </div>
          <ul class="cat-list-two">
            <li>
              <Link href="/admpanel/coachings" className={title === "coachings" ? "active" : ""}>
                Coaching
              </Link>
            </li>
            <li>
              <Link href="/admpanel/consultancies" className={title === "consultancies" ? "active" : ""}>Consultancy</Link>
            </li>
            <li>
              <Link href="/admpanel/authors" className={title === "authors" ? "active" : ""}>Authors</Link>
            </li>
            <li>
              <Link href="/admpanel/contacts" className={title === "tickets" ? "active" : ""}>Support Tickets</Link>
            </li>
            {/* <li>
              <Link href="/admpanel/orders" className={title === "orders" ? "active" : ""}>Orders</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </aside>
  </>


}