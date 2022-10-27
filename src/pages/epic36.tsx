import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Epic36 = () => {
  const session = useSession();
  const [createModal, setCreateModal] = useState(true);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-start justify-start p-4">
      {!session.data ? null : createModal ? (
        <div className="createModal fixed top-0 left-0 z-20 my-2 flex min-h-screen w-full items-center justify-center bg-info">
          <div className="relative rounded-lg bg-base-100">
            <div
              onClick={() => setCreateModal(false)}
              className="absolute right-0 cursor-pointer p-2"
            >
              <AiOutlineClose />
            </div>
            <h2 className="px-10 pt-5 pb-2 text-xl font-semibold">
              You have not registered a team for this League!
            </h2>
            <p className="px-10 font-semibold">
              To enter this league you need to create a team
            </p>
            <div className="mx-5  flex w-full flex-row justify-start p-4">
              <Link href="/create">
                <button className="btn-success btn">Create Team</button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mt-14 flex flex-col rounded-lg bg-primary px-10 pb-10 text-base-100 shadow-lg">
        <h1 className="my-8 text-4xl font-bold">Epic36 Tournement center</h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          soluta quo qui atque natus et impedit maxime, explicabo libero
          dignissimos saepe minima mollitia ipsa. Minima eveniet inventore
          dolorum unde assumenda!
        </p>
        <Link href="/create">
          <button className="btn mt-4 w-max">Create team</button>
        </Link>
      </div>

      <div className="flex w-full flex-col justify-between lg:flex-row lg:space-x-4">
        <section className="my-2 mt-5 h-max w-full rounded-lg bg-base-300 py-5 px-10 text-base-content shadow-lg">
          <h2 className="text-center text-2xl font-bold leading-none">
            Live Matches
          </h2>

          <div>
            <ul className="mt-3 flex w-full flex-col items-center justify-center">
              <li className="flex w-full flex-row items-center justify-between">
                <span className="text-2xl">PSG</span>
                <span className="font-bold">vs</span>
                <span className="text-2xl">C9</span>
              </li>
              <li className="flex w-full flex-row items-center justify-between">
                <span className="text-2xl">PSG</span>
                <span className="font-bold">vs</span>
                <span className="text-2xl">C9</span>
              </li>{" "}
              <li className="flex w-full flex-row items-center justify-between">
                <span className="text-2xl">PSG</span>
                <span className="font-bold">vs</span>
                <span className="text-2xl">C9</span>
              </li>{" "}
              <li className="flex w-full flex-row items-center justify-between">
                <span className="text-2xl">PSG</span>
                <span className="font-bold">vs</span>
                <span className="text-2xl">C9</span>
              </li>{" "}
              <li className="flex w-full flex-row items-center justify-between">
                <span className="text-2xl">PSG</span>
                <span className="font-bold">vs</span>
                <span className="text-2xl">C9</span>
              </li>{" "}
              <li className="flex w-full flex-row items-center justify-between">
                <span className="text-2xl">PSG</span>
                <span className="font-bold">vs</span>
                <span className="text-2xl">C9</span>
              </li>
            </ul>
          </div>
        </section>
        <section className="flexjustify-center my-2 mt-5 rounded-lg bg-base-300  p-10 text-base-content">
          <div className=" overflow-x-auto">
            <table className="table w-full font-semibold">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Role/Boost</th>
                  <th>Points</th>
                  <th>Team Points</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Littel, Schaden and Vandervort</td>
                  <td>Canada</td>
                  <td>12/16/2020</td>
                  <td>Blue</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Zemlak, Daniel and Leannon</td>
                  <td>United States</td>
                  <td>12/5/2020</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Carroll Group</td>
                  <td>China</td>
                  <td>8/15/2020</td>
                  <td>Red</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>Marjy Ferencz</td>
                  <td>Office Assistant I</td>
                  <td>Rowe-Schoen</td>
                  <td>Russia</td>
                  <td>3/25/2021</td>
                  <td>Crimson</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>Yancy Tear</td>
                  <td>Community Outreach Specialist</td>
                  <td>Wyman-Ledner</td>
                  <td>Brazil</td>
                  <td>5/22/2020</td>
                  <td>Indigo</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Irma Vasilik</td>
                  <td>Editor</td>
                  <td>Wiza, Bins and Emard</td>
                  <td>Venezuela</td>
                  <td>12/8/2020</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>Meghann Durtnal</td>
                  <td>Staff Accountant IV</td>
                  <td>Schuster-Schimmel</td>
                  <td>Philippines</td>
                  <td>2/17/2021</td>
                  <td>Yellow</td>
                </tr>

                <tr>
                  <th>9</th>
                  <td>Lesya Tinham</td>
                  <td>Safety Technician IV</td>
                  <td>Turner-Kuhlman</td>
                  <td>Philippines</td>
                  <td>2/21/2021</td>
                  <td>Maroon</td>
                </tr>
                <tr>
                  <th>10</th>
                  <td>Zaneta Tewkesbury</td>
                  <td>VP Marketing</td>
                  <td>Sauer LLC</td>
                  <td>Chad</td>
                  <td>6/23/2020</td>
                  <td>Green</td>
                </tr>
                <tr>
                  <th>11</th>
                  <td>Andy Tipple</td>
                  <td>Librarian</td>
                  <td>Hilpert Group</td>
                  <td>Poland</td>
                  <td>7/9/2020</td>
                  <td>Indigo</td>
                </tr>
                <tr>
                  <th>12</th>
                  <td>Sophi Biles</td>
                  <td>Recruiting Manager</td>
                  <td>Gutmann Inc</td>
                  <td>Indonesia</td>
                  <td>2/12/2021</td>
                  <td>Maroon</td>
                </tr>
                <tr>
                  <th>13</th>
                  <td>Florida Garces</td>
                  <td>Web Developer IV</td>
                  <td>Gaylord, Pacocha and Baumbach</td>
                  <td>Poland</td>
                  <td>5/31/2020</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>14</th>
                  <td>Maribeth Popping</td>
                  <td>Analyst Programmer</td>
                  <td>Deckow-Pouros</td>
                  <td>Portugal</td>
                  <td>4/27/2021</td>
                  <td>Aquamarine</td>
                </tr>
                <tr>
                  <th>15</th>
                  <td>Moritz Dryburgh</td>
                  <td>Dental Hygienist</td>
                  <td>Schiller, Cole and Hackett</td>
                  <td>Sri Lanka</td>
                  <td>8/8/2020</td>
                  <td>Crimson</td>
                </tr>
                <tr>
                  <th>16</th>
                  <td>Reid Semiras</td>
                  <td>Teacher</td>
                  <td>Sporer, Sipes and Rogahn</td>
                  <td>Poland</td>
                  <td>7/30/2020</td>
                  <td>Green</td>
                </tr>
                <tr>
                  <th>17</th>
                  <td>Alec Lethby</td>
                  <td>Teacher</td>
                  <td>Reichel, Glover and Hamill</td>
                  <td>China</td>
                  <td>2/28/2021</td>
                  <td>Khaki</td>
                </tr>
                <tr>
                  <th>18</th>
                  <td>Aland Wilber</td>
                  <td>Quality Control Specialist</td>
                  <td>Kshlerin, Rogahn and Swaniawski</td>
                  <td>Czech Republic</td>
                  <td>9/29/2020</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <th>19</th>
                  <td>Teddie Duerden</td>
                  <td>Staff Accountant III</td>
                  <td>Pouros, Ullrich and Windler</td>
                  <td>France</td>
                  <td>10/27/2020</td>
                  <td>Aquamarine</td>
                </tr>
                <tr>
                  <th>20</th>
                  <td>Lorelei Blackstone</td>
                  <td>Data Coordiator</td>
                  <td>Witting, Kutch and Greenfelder</td>
                  <td>Kazakhstan</td>
                  <td>6/3/2020</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Epic36;
