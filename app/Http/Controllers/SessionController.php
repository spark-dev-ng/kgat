<?php namespace App\Http\Controllers;

use App\Session;
use Illuminate\Http\Request;

class SessionController extends Controller {

    public function getIndex()
    {
        $session = Session::active();
        return view('admin.session.manage', compact('session'));
    }

    public function update(Request $request)
    {       
        $selectedSession = $request->input('session');
        $currentSession = Session::active();
        
        if ($selectedSession === $currentSession->name) {
            return redirect('/session')
            ->withInput($request->all())
            ->withErrors("Session is currently active");
        }

        $session = Session::where('name', $selectedSession)
        ->get();
        $sessions = Session::all();
        foreach ($sessions as  $ses) {
            $ses->status =0;
            return $ses;
            $ses->save();
        }
        $session->status=1;
        $session->save();

        return redirect('/session')->with('success', 'Session changed Successfully');
        
    }

    public function store(Request $request)
    {       
        $selectedSession = $request->input('session');
        $currentSession = Session::find(1);

        if ($selectedSession === $currentSession->name) {
            return redirect('/session')
            ->withInput($request->all())
            ->withErrors("Session is currently active");
        }

        Session::create(['name'=>$selectedSession, 'status'=>0]);

        return redirect('/session')->with('success', 'Session created successfully');
    }
}
