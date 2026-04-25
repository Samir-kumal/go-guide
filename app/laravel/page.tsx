import { Routing } from '@/components/sections/laravel/Routing'
import { Controllers } from '@/components/sections/laravel/Controllers'
import { RequestsResponses } from '@/components/sections/laravel/RequestsResponses'
import { Middleware } from '@/components/sections/laravel/Middleware'
import { Sanctum } from '@/components/sections/laravel/Sanctum'
import { Validation } from '@/components/sections/laravel/Validation'
import { ErrorHandlingTutorial } from '@/components/sections/laravel/ErrorHandling'
import { Testing } from '@/components/sections/laravel/Testing'
import { SessionsCookies } from '@/components/sections/laravel/SessionsCookies'
import { BladeTemplates } from '@/components/sections/laravel/BladeTemplates'
import { EloquentORM } from '@/components/sections/laravel/EloquentORM'
import { MigrationsSeeders } from '@/components/sections/laravel/MigrationsSeeders'
import { ScoutSearch } from '@/components/sections/laravel/ScoutSearch'
import { FileStorage } from '@/components/sections/laravel/FileStorage'
import { Mail } from '@/components/sections/laravel/Mail'
import { Notifications } from '@/components/sections/laravel/Notifications'
import { ReverbWebSockets } from '@/components/sections/laravel/ReverbWebSockets'
import { Collections } from '@/components/sections/laravel/Collections'
import { ServiceContainer } from '@/components/sections/laravel/ServiceContainer'
import { Pennant } from '@/components/sections/laravel/Pennant'
import { QueuesJobs } from '@/components/sections/laravel/QueuesJobs'
import { EventsListeners } from '@/components/sections/laravel/EventsListeners'
import { TaskScheduling } from '@/components/sections/laravel/TaskScheduling'
import { Horizon } from '@/components/sections/laravel/Horizon'
import { Pulse } from '@/components/sections/laravel/Pulse'
import { Nova } from '@/components/sections/laravel/Nova'
import { AuthenticationAuthorization } from '@/components/sections/laravel/AuthenticationAuthorization'
import { ArtisanConsole } from '@/components/sections/laravel/ArtisanConsole'

export default function LaravelGuidePage() {
  return (
    <>
      <h1 className="text-[#FF2D20] border-b-4 border-[#FF2D20] pb-2.5 text-3xl font-bold">
        Laravel Documentation
      </h1>
      <p className="italic">
        The PHP framework for Web Artisans.
      </p>
      <hr className="border-none border-t border-[#ddd] my-10" />
      
      <Routing />
      <Controllers />
      <RequestsResponses />
      <Middleware />
      <Sanctum />
      <Validation />
      <ErrorHandlingTutorial />
      <Testing />
      <SessionsCookies />
      <BladeTemplates />
      <EloquentORM />
      <MigrationsSeeders />
      <ScoutSearch />
      <FileStorage />
      <Mail />
      <Notifications />
      <ReverbWebSockets />
      <Collections />
      <ServiceContainer />
      <Pennant />
      <QueuesJobs />
      <EventsListeners />
      <TaskScheduling />
      <Horizon />
      <Pulse />
      <Nova />
      <AuthenticationAuthorization />
      <ArtisanConsole />

      <p className="text-center text-[#666] mt-10">
        <em>Document created for learning purposes. Happy coding!</em>
      </p>
    </>
  )
}
