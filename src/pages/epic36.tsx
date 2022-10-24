import React from "react";
import { Player } from "../components/Player";

const Epic36 = () => {
  return (
    <main className="container mx-auto flex max-h-screen flex-col items-start justify-start p-4">
      <div className="flex flex-col rounded-lg bg-primary px-10 pb-10 text-base-100 shadow-lg">
        <h1 className="my-8 text-4xl font-bold">Epic36 Tournement center</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          soluta quo qui atque natus et impedit maxime, explicabo libero
          dignissimos saepe minima mollitia ipsa. Minima eveniet inventore
          dolorum unde assumenda!
        </p>
      </div>
      <div className="flex flex-row space-x-4">
        <section className="my-5 w-auto rounded-lg bg-base-300 p-10 text-base-content shadow-lg">
          <h2 className="text-2xl font-bold">Live Matches</h2>

          <div>
            <ul>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
              <li>mvt</li>
            </ul>
          </div>
        </section>
        <section className="my-5 flex justify-center bg-base-300 p-10  text-base-content">
          <div className=" overflow-x-auto">
            <table className="table font-semibold">
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
